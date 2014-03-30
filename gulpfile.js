var gulp = require( 'gulp' ),
	shell = require( 'gulp-shell' );

gulp.task( 'test', function () {
	return gulp.src( '' ).pipe( shell( [ 'npm test' ] ) );
} );

gulp.task( 'watch', function () {
	gulp.watch( [ './src/**/*.js' ], [ 'test' ] );
	gulp.watch( [ './test/**/*' ], [ 'test' ] );
	gulp.watch( [ '*.js' ], [ 'default' ] );
} );

gulp.task( 'default', [ 'test' ] );