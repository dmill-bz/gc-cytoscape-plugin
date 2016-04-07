import CytoscapeVisualizer from './CytoscapeVisualizer';

/**
 * Plugin that adds cytoscape visualization to the console.
 *
 * @author Dylan Millikin <dylan.millikin@gmail.com>
 */
class CytoscapeVisualizerPlugin {

    /**
     * This method loads all the required features for this plugin
     *
     * @param  {Console} main the console object
     * @return {Void}
     */
    load(main) {
        //create a custom client
        const viz = new CytoscapeVisualizer(main.options.visualizerOptions);
        //lets init the console's client (@todo would be good not to have to do this)
        main.initClient();
        //create a new client for the viz plugin (hacky)
        //viz.client = new main.client.constructor(main.options.host, main.options.port, main.options.driverOptions);

        //main events should trigger cisualization
        main.on('results', (query, parser) => {
            //init the viz
            main.client.execute('g.V().union(g.V(), g.E())', (InitParser) =>{
                viz.removeAllElements();
                viz.addElements(InitParser);
                viz.highlightElements(parser);
            });
        });
    }
}

export default CytoscapeVisualizerPlugin;
