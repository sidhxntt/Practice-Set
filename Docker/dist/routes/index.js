import home from "./homes.js";
const allRoutes = (app) => {
    app.use("/", home);
};
export default allRoutes;
