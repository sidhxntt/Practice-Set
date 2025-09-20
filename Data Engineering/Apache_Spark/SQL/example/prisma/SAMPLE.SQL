-- USED IN SUPABASE ON THE DATA LOADED USING THE DB SEEDING SCRIPT FOLLOWING PRISMA SCHEMA
with
  extracted_numbers as (
    select
      id as user_id,
      unnest(regexp_matches("phone", '\d+', 'g')) as numbers
    from
      "User"
  ),
  summary_1 as (
    select
      *
    from
      (
        select
          user_id,
          numbers::int as numbers_int,
          RANK() over (
            partition by
              user_id
            order by
              numbers::int desc
          ) as rank
        from
          extracted_numbers
      ) sub
    where
      sub.rank = 1
  ),
  summary_2 as (
    select
      *,
      RANK() over (
        order by
          total_users desc
      ) as rank
    from
      (
        select
          smtp_client,
          COUNT(*) as total_users
        from
          (
            select
              case
                when email like '%gmail.com' then 'gmail'
                when email like '%hotmail.com' then 'hotmail'
                when email like '%yahoo.com' then 'yahoo'
                else 'other'
              end as smtp_client
            from
              "User"
          )
        group by
          smtp_client
        order by
          total_users desc
      )
  ),
  summary_3 as (
    select
      *
    from
      summary_1 s1
      left join summary_2 s2 on s1.rank = s2.rank
  ),
  summary_4 as (
    select
      *,
      case
        when total_val < 10000 then 1
        else 0
      end as binary_indicator
    from
      (
        select
          user_id,
          numbers_int + total_users as total_val
        from
          summary_3
      )
  ),
  summary_5 as (
    select
      *,
      lag_value + lead_value as final
    from
      (
        select
          *,
          ROW_NUMBER() over (
            order by
              total_required_users desc
          ) as rn,
          LAG(total_required_users, 1, 0) over (
            order by
              total_required_users desc
          ) as lag_value,
          LEAD(total_required_users, 1, 0) over (
            order by
              total_required_users desc
          ) as lead_value
        from
          (
            select
              binary_indicator,
              COUNT(*) as total_required_users
            from
              summary_4
            group by
              binary_indicator
          )
      )
  ),
  final as (
    select
      case
        when SUM(final) = SUM(total_required_users) then 'PASSED'
        else 'FAILED'
      end as result
    from
      summary_5
  )
select
  *
from
  final