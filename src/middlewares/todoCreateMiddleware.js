import { string, object } from "yup";

export async function todoCreateMiddleware(ctx, next) {
  try {
    const todo = ctx.request.body;

    const schema = object().shape({
      title: string().required(),
    });

    await schema.validate(todo);
    return next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name,
    };
  }
}
