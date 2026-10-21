# Article Search Test Plan

## Application Overview

The Global feed at `/articles` (no login required) has a "Search headlines…" searchbox with Sort (Newest first / Oldest first / Most favorited), a "With cover" checkbox, and Reset / Apply buttons. Search filters the feed by headline, case-insensitive substring match, and runs only on Apply or Enter. The result count label ("N articles" / "1 article") updates after the search. The URL does not change. Only 10 cards render at once.

The feed is shared and grows between runs, so counts are never fixed: `N` below is the counter value read in the same test before searching. Scenarios that need a match first create an article with a unique headline `H` (e.g. `Search Probe <timestamp>`) as the registered user.

## Test Scenarios

### 1. Article Search

**Seed:** `tests/seed.spec.ts`

#### 1.1. should-filter-articles-by-exact-headline

**File:** `tests/articles/article-search.spec.ts`

**Steps:**
  1. Log in as the registered user and create an article with headline `H`
  2. Navigate to /articles
    - expect: The searchbox is empty
  3. Type `H` into the "Search headlines…" box and click Apply
    - expect: Counter shows "1 article"
    - expect: Only one card is displayed, with heading `H`

#### 1.2. should-show-empty-state-when-nothing-matches

**File:** `tests/articles/article-search.spec.ts`

**Steps:**
  1. Navigate to /articles
  2. Type "zzzxqq" into the search box and click Apply
    - expect: Counter shows "0 articles"
    - expect: Text "No articles here yet." is visible and no article cards are rendered

#### 1.3. should-match-case-insensitively-and-partially

**File:** `tests/articles/article-search.spec.ts`

**Steps:**
  1. Log in as the registered user and create an article with headline `H`
  2. Navigate to /articles
  3. Type `H` in upper case and click Apply
    - expect: Counter shows "1 article" with heading `H`
  4. Replace the query with a part of `H` that is unique to it (e.g. the timestamp) and click Apply
    - expect: Counter shows "1 article" with heading `H`

#### 1.4. should-submit-search-with-enter-key

**File:** `tests/articles/article-search.spec.ts`

**Steps:**
  1. Log in as the registered user and create an article with headline `H`
  2. Navigate to /articles
  3. Type `H` into the search box and press Enter (do not click Apply)
    - expect: Counter shows "1 article"

#### 1.5. should-not-filter-until-apply-is-clicked

**File:** `tests/articles/article-search.spec.ts`

**Steps:**
  1. Navigate to /articles and read the counter value `N`
  2. Type "zzzxqq" into the search box without clicking Apply
    - expect: Counter still shows `N` (no live filtering)
  3. Click Apply
    - expect: Counter shows "0 articles"

#### 1.6. should-restore-full-list-on-reset-or-empty-query

**File:** `tests/articles/article-search.spec.ts`

**Steps:**
  1. Log in as the registered user and create an article with headline `H`
  2. Navigate to /articles and read the counter value `N`
  3. Search `H` and click Apply
    - expect: Counter shows "1 article"
  4. Click Reset
    - expect: Counter shows `N`
    - expect: Search box is empty
  5. Search "zzzxqq" and Apply, then clear the box and click Apply with an empty query
    - expect: Counter shows `N`
  6. Type only spaces ("   ") and click Apply
    - expect: Counter shows `N` (whitespace is trimmed and ignored)
  7. Type `H` padded with spaces and click Apply
    - expect: Counter shows "1 article" (input is trimmed)

#### 1.7. should-handle-special-characters-and-very-long-input

**File:** `tests/articles/article-search.spec.ts`

**Steps:**
  1. Navigate to /articles and read the counter value `N`
  2. Search `<b>x</b>` and click Apply
    - expect: Counter shows "0 articles", empty-state text shown, no HTML injected or rendered, no error
  3. Search `'; DROP TABLE` and click Apply
    - expect: Counter shows "0 articles", page still works
  4. Search a 600-character string of "a" and click Apply
    - expect: Counter shows "0 articles", no crash or layout break
  5. Search "%" and click Apply
    - expect: Observed behaviour: counter shows `N` (all). Verify whether "%" is treated as a wildcard (possible bug) or intended; no title contains a literal "%".
