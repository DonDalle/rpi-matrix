var Matrix = require('../../index.js');

class Sample {

    constructor(options) {
        this.matrix = new Matrix(options);
        this.canvas = this.matrix.getCanvas();

    }

    delay(ms = 3000) {
        return new Promise((resolve, reject) => {
            return setTimeout(resolve, ms);
        });
    }

    getImage(image) {
        var path = require("path");
        return this.canvas.loadImage(path.join(__dirname, '..', image));
    }

    scrollImage(image) {
        return new Promise((resolve, reject) => {
            var ctx = this.canvas.getContext('2d');

            for (var offset = this.canvas.width; offset > -image.width; offset--) {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                ctx.drawImage(image, offset, 0);

                this.canvas.render();
                this.canvas.render();
                this.canvas.render();
                this.canvas.render();

            }
            resolve();
        });

    }

    run() {
        this.getImage('./images/50.png').then((image) => {
            return this.scrollImage(image);
        })
        .then(() => {
            return this.delay(0);

        })
        .catch((error) => {
            console.log(error);
        });

    }
};

var sample = new Sample({width:32, height:32});
sample.run();