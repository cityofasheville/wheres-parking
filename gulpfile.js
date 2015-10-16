'use strict';

//   ____ _   _ _     ____  
//  / ___| | | | |   |  _ \ 
// | |  _| | | | |   | |_) |
// | |_| | |_| | |___|  __/ 
//  \____|\___/|_____|_|    
//                        

 //  _   _  ___  ____  _____   ____   _    ____ _  __    _    ____ _____ ____  
 // | \ | |/ _ \|  _ \| ____| |  _ \ / \  / ___| |/ /   / \  / ___| ____/ ___| 
 // |  \| | | | | | | |  _|   | |_) / _ \| |   | ' /   / _ \| |  _|  _| \___ \ 
 // | |\  | |_| | |_| | |___  |  __/ ___ \ |___| . \  / ___ \ |_| | |___ ___) |
 // |_| \_|\___/|____/|_____| |_| /_/   \_\____|_|\_\/_/   \_\____|_____|____/ 
 //                                                                         

//***REQUIRE NODE PACKAGES***//

//***FOR GULP***//
var gulp = require('gulp');

//***FOR DEV SERVER***// 
var browserSync = require('browser-sync');
var reload      = browserSync.reload;



//  _____  _    ____  _  ______  
// |_   _|/ \  / ___|| |/ / ___| 
//   | | / _ \ \___ \| ' /\___ \ 
//   | |/ ___ \ ___) | . \ ___) |
//   |_/_/   \_\____/|_|\_\____/ 
//

//Generic error handler for tasks
function handleError(err) {
  	console.error(err.toString());
  	this.emit('end');
}

//***** DEFAULT TASKS ******//

gulp.task('default', function () {
    //DO NOTHING BY DEFAULT
});

//***** DEV SERVER TASKS ******//

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "app"
        },
        ghostMode : false
    });
});

gulp.task('serve', ['watch', 'browser-sync']);

gulp.task('reload', [''], function() {
    gulp.src('app/*')
      .pipe(reload({stream:true}));
});

//***** WATCH TASKS ******//

gulp.task('watch',function () {
  gulp.watch('app/*.js', ['reload']);
  gulp.watch('app/*.html', ['reload']);
});



	