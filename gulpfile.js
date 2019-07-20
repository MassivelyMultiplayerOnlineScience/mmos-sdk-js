'use strict';

const gulp = require('gulp');

const bump = require('gulp-bump');

const git = require('gulp-git');
const tagVersion = require('gulp-tag-version');
const wait = require('gulp-wait');

const path = require('path');

gulp.task('bump', () => {
	return gulp.src(path.join(process.cwd(), 'package.json'))
		.pipe(bump())
		.pipe(gulp.dest('./'));
});

gulp.task('git:add', () => {
	return gulp.src(process.cwd())
		.pipe(git.add({ args: '--all -v' }));
});
gulp.task('git:commit', () => {
	return gulp.src(process.cwd())
		.pipe(git.commit(process.argv[4] || 'Bump version'));
});
gulp.task('git:tag', () => {
	return gulp.src(path.join(process.cwd(), 'package.json'))
		.pipe(tagVersion())
		.pipe(wait(500));
});
gulp.task('git:push', (callback) => {
	git.push('origin', 'master', { args: '-v --tags' }, () => {
		callback();
	});
});

gulp.task('git', gulp.series('bump', 'git:add', 'git:commit', 'git:tag', 'git:push'));

