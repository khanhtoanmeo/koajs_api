import yup from "yup";

export async function todoUpdateMiddleware(ctx, next) {
  try {
    const todo = ctx.request.body;

    const schema = yup.object().shape({
      title: yup.string().notRequired(),
      isCompleted: yup.boolean().notRequired(),
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
