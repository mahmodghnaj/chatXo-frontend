import { socialAuth } from "./middleware/social-auth";
import { stackMiddleware } from "./middleware/stack-middleware";
import { withAuthorization } from "./middleware/with-authorization";

export default stackMiddleware([socialAuth, withAuthorization]);
