import {
  deleteById,
  getAll,
  getOne,
  save,
  update,
} from "../database/repositories/productsRepository.js";

export function getProducts(ctx) {
  try {
    const { query } = ctx;
    const products = getAll(query);
    ctx.status = 200;
    ctx.body = { data: products };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      succes: false,
      error: e.message,
    };
  }
}

export function getProduct(ctx) {
  try {
    const { id } = ctx.params;
    const fields = ctx.query.fields?.split(",");

    const product = getOne(id, fields);

    if (!product) {
      ctx.status = 404;
      return (ctx.body = {
        status: "false",
        message: "Product not found with that id",
      });
    }

    ctx.status = 200;
    ctx.body = {
      succes: true,
      data: product,
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      succes: false,
      error: e.message,
    };
  }
}

export function saveProduct(ctx) {
  try {
    const data = ctx.request.body;
    save(data);

    ctx.status = 201;
    ctx.body = {
      succes: true,
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      succes: false,
      error: e.message,
    };
  }
}

export function updateProduct(ctx) {
  try {
    const data = ctx.request.body;
    const { id } = ctx.params;
    const product = update(id, data);
    if (!product) {
      ctx.status = 404;

      return (ctx.body = {
        status: "false",
        message: "Product not found with that id",
      });
    }

    ctx.status = 200;
    ctx.body = {
      succes: true,
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      succes: false,
      error: e.message,
    };
  }
}

export function deleteProduct(ctx) {
  try {
    const { id } = ctx.params;
    const product = deleteById(id);
    if (!product) {
      ctx.status = 404;

      return (ctx.body = {
        status: "false",
        message: "Product not found with that id",
      });
    }

    ctx.status = 200;
    ctx.body = {
      succes: true,
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      succes: false,
      error: e.message,
    };
  }
}
