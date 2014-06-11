(function () {
    window.CONFIG = {
        // Toggle this property on for server interaction. WARNING All root urls must point to a real database API
        online: false,
        debug: true,
        hitBoxVisible: true,

        images: {
            // Replace with an actual URL to your images root
            root: '/data/images.json'
        },

        sprites: {
            // Also replace with a real url
            root: '/data/sprites.json'
        },

        animationGroups: {
            root: '/data/animation-groups.json',
            defaultWidth: 20,
            defaultHeight: 20
        },

        animations: {
            root: '/data/animations.json'
        },

        timelines: {
            root: '/data/timelines.json'
        }
    };
}());