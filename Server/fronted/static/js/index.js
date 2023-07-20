import Dashboard from "./views/dashboard.js";
import Posts from "./views/post.js";
import PostView from "./views/PostView.js";
import Settings from "./views/settings.js";
import Login from "./views/Login.js";
import register from "./views/register.js";
import createMenu from "./views/createMenu.js";
import uploadimage from "./views/uploadimage.js";
import createProfile from "./views/createProfile.js";
import createCategory from "./views/createCategory.js";
import createDish from "./views/createDish.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: Dashboard },
        { path: "/login", view: Login },
        { path: "/posts", view: Posts },
        { path: "/posts/:id", view: PostView },
        { path: "/settings", view: Settings },
        { path: "/register", view: register },
        {path: "/createMenu", view: createMenu},
        {path: "/uploadImage", view: uploadimage},
        {path: "/createProfile", view: createProfile},
        {path: "/createCategory", view: createCategory},
        {path: "/createDish", view: createDish}




    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));
    const appElement = document.querySelector("#app");
  
    try {
      const html = await view.getHtml();
      appElement.innerHTML = html;
    } catch (error) {
      console.error("Error loading HTML:", error);
      appElement.innerHTML = "<p>Error loading the page.</p>";
    }
    view.afterRender();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});