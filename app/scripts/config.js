(function () {
    window.CONFIG = {
        // Toggle this property on for server interaction. WARNING All root urls must point to a real database API
        online: false,

        images: {
            // Replace with an actual URL to your images root
            root: '/data/images.json'
        },

        sprites: {
            // Also replace with a real url
            root: '/data/sprites.json'
        },

        animationGroups: {
            root: '/data/animation-groups.json'
        },

        animations: {
            root: '/data/animations.json'
        }
    };
}());