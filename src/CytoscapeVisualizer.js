import cytoscape from 'cytoscape';
import $ from 'jquery';

class CytoscapeVisualizer {

    /**
     * @var {Cytoscape} the cytoscape object wrapped by this class
     */
    cytoscape;

    /**
     * @var {Client} The visualizer maintains it's own client to avoid triggering unwanted events in the console
     */
    client;

    /**
     * Constructor. Initialize necessary data.
     *
     * @param  {Object} options The options for the vizualizer
     * @return {Void}
     */
    constructor(options) {
        if(typeof options.container == "string") {
            options.container = $(options.container);
        }
        const customOptions = {
            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                        'content': 'data(id)',
                        'text-valign': 'center',
                        'color': 'white',
                        'text-outline-width': 2,
                        'text-outline-color': 'data(color)',
                        'background-color': 'data(color)',
                        'text-wrap':'wrap',
                        'border-width':2,
                        'border-color':'data(color)'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'label' : 'data(label)',
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle',
                        'edge-text-rotation': 'autorotate',
                        'text-outline-width': 2,
                        'text-outline-color': 'white'
                    }
                },
                {
                    selector: 'node:selected',
                    style: {
                        'background-color': '#fff',
                        'label' : 'data(label)'
                    }
                }
            ],
            ...options
        };
        this.cytoscape = cytoscape(customOptions);
    }

    /**
     * Removes all elements (Vertices and Edges) from the visualizer
     *
     * @return {Void}
     */
    removeAllElements() {
        this.cytoscape.elements().remove();
    }

    /**
     * Adds elements (Vertices and Edges) to the visualizer
     *
     * @param  {Result} result The result from the {Client}
     * @return {Void}
     */
    addElements(parser) {
        let update = false;
        if(!parser.getError()) {
            parser.getResults().forEach((entry) => {
                if(entry.type == "vertex") {
                    update = true;
                    this.cytoscape.add({
                        group:"nodes",
                        data:{
                            id:entry.id,
                            label:entry.label,
                            color: this._stringToColor(entry.label)
                        }

                    });
                }else if(entry.type == "edge") {
                    update = true;
                    this.cytoscape.add({
                        group:"edges",
                        data:{
                            id:'e-'+entry.id,
                            label:entry.label,
                            target: entry.inV,
                            source: entry.outV
                        }
                    });
                }
            });
            if(update) {
                this.cytoscape.layout({name:'cose'});
            }
        }
    }

    /**
     * Highlights elements (Vertices and Edges) in the visualizer
     *
     * @param  {Result} result The result from the {Client}
     * @return {Void}
     */
    highlightElements(parser) {
        let update = false;
        if(!parser.getError()) {
            parser.getResults().forEach((entry) => {
                //There's a special case for null
                if(entry !== null)
                {
                    var objects = typeof entry.objects == "undefined" ? [entry] : entry.objects;
                    objects.forEach((entry) => {
                        if(entry.type == "vertex") {
                            update = true;
                            var elem = this.cytoscape.getElementById(entry.id);
                            elem.css({textOutlineColor:"red", borderColor : "red"});
                        } else if(entry.type == "edge") {
                            var elem = this.cytoscape.getElementById('e-' + entry.id);
                            elem.css({textOutlineColor:"red", backgroundColor : "red", lineColor:"red", sourceArrowColor: "red", targetArrowColor: "red", color:"white"});
                            update = true;
                        }
                    });
                }
            });
            if(update) {
                this.cytoscape.layout({name:'cose'});
            }
        }
    }

    /**
     * Convert a string (label) to a hex color
     *
     * @param  {String} str The string to convert
     * @return {String} an hexadecimal color value
     */
    _stringToColor(str) {
        //create hash
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
           hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        //generate hex color
        var c = (hash & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();

        var colorHex = "00000".substring(0, 6 - c.length) + c;
        return "#"+colorHex;
    }
}

export default CytoscapeVisualizer;
