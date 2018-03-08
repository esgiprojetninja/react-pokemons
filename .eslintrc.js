module.exports = {
    "extends": ["airbnb", "react-app"],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "prefer-template": "error",
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/jsx-indent": [2, 4],
        "react/jsx-indent-props": [2, 4],
        "jsx-a11y/href-no-hash": [0, 0]
    },
    "globals": {
        "google": true
    }
};
