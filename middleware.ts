import { stackMiddleware } from "./middleware/stack-middleware";
import { withAuthorization } from "./middleware/with-authorization";

export default stackMiddleware([withAuthorization]);
