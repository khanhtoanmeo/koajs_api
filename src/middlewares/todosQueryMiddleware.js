import { object, number, string } from "yup";
import { ASCENDING, DESCENDING } from "../const/constants.js";

export async function todosQueryMiddleware(ctx, next) {
  try {
    const queryObj = ctx.query;

    const schema = object().shape({
      limit: number().optional().moreThan(0).positive(),
      orderBy: string().optional().oneOf([ASCENDING, DESCENDING]),
    });

    await schema.validate(queryObj);
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
