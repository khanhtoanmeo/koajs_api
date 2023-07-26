import yup from "yup";
import { getProducts } from "../helpers/databaseQuery.js";

export async function productCreateMiddleware(ctx, next) {
  try {
    const product = ctx.request.body;
    const productsDB = getProducts();
    const productNameList = productsDB.map((product) => product.name);

    const schema = yup.object().shape({
      name: yup.string().nonNullable().required().notOneOf(productNameList),
      price: yup.number().positive().required(),
      description: yup.string().required(),
      color: yup.string().required(),
      image: yup.string().required(),
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
