var canvas;
var gl;

//TODO: Define global variables if needed

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );

    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );    

    //TODO: generate tetrahedron geometry and send vertices and colors to GPU

    // sliders for viewing parameters
	document.getElementById("rotX").oninput = function(event) {
        //TODO:handle input here
    };
	
    document.getElementById("rotY").oninput = function(event) {
        //TODO:handle input here
    };

    document.getElementById("objRotationZSlider").oninput = function(event) {
        //TODO:handle input here
    };
   
    document.getElementById("posX").oninput = function(event) {
        //TODO:handle input here
    };
	
    document.getElementById("posY").oninput = function(event) {
        //TODO:handle input here
    };
	
	document.getElementById("scaleX").oninput = function(event) {
        //TODO:handle input here
    };
	
    document.getElementById("scaleY").oninput = function(event) {
        //TODO:handle input here
    };
	   
	document.getElementById("ResetButton").addEventListener("click", function(){
		//TODO:handle input here
    });	
   
    render();
}

//TODO:modify this function to render the shape and apply transformations
var render = function(){

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    requestAnimFrame(render);
}
