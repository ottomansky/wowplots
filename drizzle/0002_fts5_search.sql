-- FTS5 virtual table for full-text search on builds
CREATE VIRTUAL TABLE IF NOT EXISTS builds_fts USING fts5(
  title,
  description,
  tags,
  content='',
  contentless_delete=1
);
