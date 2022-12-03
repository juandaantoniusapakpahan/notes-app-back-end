const mapDBToModel = ({
  id,
  title,
  body,
  tags,
  // eslint-disable-next-line camelcase
  created_at,
  // eslint-disable-next-line camelcase
  updated_at,
}) => ({
  id,
  title,
  body,
  tags,
  // eslint-disable-next-line camelcase
  createdAt: created_at,
  // eslint-disable-next-line camelcase
  updatedAt: updated_at,
});

module.exports = { mapDBToModel };
