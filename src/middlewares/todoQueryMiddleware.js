import { ALLOWED_QUERY_FIELDS } from "../const/constants.js";

export async function todoQueryMiddleware(ctx, next) {
  try {
    const fields = ctx.query.fields?.split(",");

    if (!fields) return next();

    if (
      !fields.every((field) =>
        ALLOWED_QUERY_FIELDS.includes(field.toLowerCase().trim())
      )
    ) {
      ctx.status = 400;
      return (ctx.body = {
        success: false,
        message:
          "You can only specify these fields " +
          JSON.stringify(ALLOWED_QUERY_FIELDS),
      });
    }

    next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name,
    };
  }
}
