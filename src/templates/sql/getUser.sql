select
  id,
  name
from
  user
where
  1 = 1
  {{#id}}
  and id = :id
  {{/id}}
  {{#name}}
  and name like concat('%', :name, '%')
  {{/name}}
