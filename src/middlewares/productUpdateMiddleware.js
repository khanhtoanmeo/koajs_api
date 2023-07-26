import yup from "yup";
import { getProducts } from "../helpers/databaseQuery.js";

export async function productUpdateMiddleware(ctx, next) {
  try {
    const product = ctx.request.body;
    const productsDB = getProducts();
    const productNameList = productsDB.map((product) => product.name);

    const schema = yup.object().shape({
      name: yup.string().nonNullable().notRequired().notOneOf(productNameList),
      price: yup.number().positive().notRequired(),
      description: yup.string().notRequired(),
      color: yup.string().notRequired(),
      image: yup.string().notRequired(),
    });

    await schema.validate(product);
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
