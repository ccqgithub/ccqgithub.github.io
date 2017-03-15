/**
 * Created by sunqi on 16/1/6.
 */

var audio = document.querySelector('#miku-music');
var container;

var mesh, camera, scene, renderer;

var directionalLight;

var ikSolver;

var windowWidth  = window.innerWidth;
var windowHeight = window.innerHeight;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var clock = new THREE.Clock();

var params = getUrlSearchParam(window.location.search);
var hashParams = getUrlSearchParam(window.location.hash.replace(/^#/, '?'));

var settings = {
  music: parseInt(params.music || 0),
  volume: parseFloat(params.volume || 1),
  musicUrl: params.musicUrl || './bgm.mp3',
}

var danceConfig = {
  speed: parseFloat(hashParams.speed || 1),
  mute: parseFloat(hashParams.speed || 0),
}

window.addEventListener("hashchange", function() {
  var hashParams = getUrlSearchParam(window.location.hash.replace(/^#/, '?'));
  danceConfig.speed = parseFloat(hashParams.speed || 1);
  danceConfig.mute = parseFloat(hashParams.mute || 0);
}, false);

init();
animate();

function getUrlSearchParam(search) {
  search = search || window.location.search;
  var params = {};
  var re = /(?:\?|\&)([^\=]*)\=([^\&]*)/g;
  var mg = re.exec(search);
  while (mg) {
    var value = decodeURIComponent(mg[2]),
      key = mg[1];

    params[key] = value;
    mg = re.exec(search);
  }
  return params;
}

function init() {
    audio.src = settings.musicUrl;
    audio.load();

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.z = 35;

    // scene

    scene = new THREE.Scene();

    camera.lookAt(scene.position);


    var ambient = new THREE.AmbientLight( 0x444444 );
    scene.add( ambient );

    directionalLight = new THREE.DirectionalLight( 0xFFEEDD );
    directionalLight.position.set( -1, 1, 1 ).normalize();
    scene.add( directionalLight );

    //加载mmd模型
    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };

    var onError = function ( xhr ) {
    };

    var loader = new THREE.MMDLoader();
    loader.load('./miku_v2.pmd', './wavefile_v2.vmd', function ( object ) {

        if (settings.music == 1) {
          audio.volume = danceConfig.mute == 1 ? 0 : settings.volume;
          audio.playbackRate = danceConfig.speed * 1;
          audio.loop = true;
          audio.play();
        }

        mesh = object;

        mesh.position.y = -10;
        scene.add( mesh );

        var animation = new THREE.Animation( mesh, mesh.geometry.animation );
        animation.play();

        var morphAnimation = new THREE.MorphAnimation2( mesh, mesh.geometry.morphAnimation );
        morphAnimation.play();

        ikSolver = new THREE.CCDIKSolver( mesh );

    }, onProgress, onError );

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( windowWidth, windowHeight );
    container.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
    windowWidth  = window.innerWidth;
    windowHeight = window.innerHeight;
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = windowWidth / windowHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( windowWidth, windowHeight );
}

function onDocumentMouseMove( event ) {

    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;

}


function animate() {
    requestAnimationFrame( animate );
    var delta = clock.getDelta();
    render(delta);
}

function render(delta) {

  THREE.AnimationHandler.update( delta * danceConfig.speed);
  directionalLight.color.setHex(0xFFEEDD);

  audio.playbackRate = danceConfig.speed * 1;
  audio.volume = danceConfig.mute == 1 ? 0 : settings.volume;

  if( ikSolver ) {
      ikSolver.update();
  }

  camera.updateProjectionMatrix();
  renderer.render( scene, camera );
}
