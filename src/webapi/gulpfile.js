"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    clean = require("gulp-rimraf"),
    zip = require("gulp-zip");

var webroot = "./wwwroot/";
var AWS = "./AWS/";

var paths = {
    publish: AWS + "publish/",
    output: AWS + "output/"
};

gulp.task("clean:aws:publish", function (cb) {
    rimraf(paths.publish, cb);
});


gulp.task("aws:clean:publish", function () {
    return gulp.src(paths.publish + "*", { read: false }).pipe(clean());
});
gulp.task("aws:clean:output", function () {
    return gulp.src(paths.output + "*", { read: false }).pipe(clean());
});
gulp.task("aws:clean", ["aws:clean:publish", "aws:clean:output"]);

gulp.task("aws:postpackage:clean", function () {
    gulp.src(paths.output + "aws-windows-deployment-manifest.json", { read: false }).pipe(clean());
    gulp.src(paths.output + "webapp.zip", { read: false }).pipe(clean());
});

//zip
gulp.task("aws:zip:publish", function () {
    return gulp.src(paths.publish + "**")
        .pipe(zip("webapp.zip"))
        .pipe(gulp.dest(paths.output));
});
gulp.task("aws:copymanifest", function () {
    return gulp.src(AWS + "aws-windows-deployment-manifest.json")
        .pipe(gulp.dest(paths.output));
});
gulp.task("aws:prepareoutput", ["aws:zip:publish", "aws:copymanifest"]);

var date = new Date();
var dateFormat = date.toJSON().replace(/:/g, '-');

var pjson = require('./package.json');

gulp.task("aws:zip:package", function () {
    return gulp.src(paths.output + "*")
        .pipe(zip(pjson.version + "_" + dateFormat + ".zip"))
        .pipe(gulp.dest(paths.output));
});