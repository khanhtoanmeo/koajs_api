import yup from "yup";

export async function todoCreateMiddleware(ctx, next) {
  try {
    const todo = ctx.request.body;

    const schema = yup.object().shape({
      title: yup.string().required(),
    });

    await schema.validate(todo);
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
