import type { Stylesheet } from "cytoscape";

const styles: Stylesheet[] = [
    {
        selector: 'node',
        style: {
            'width': '50',
            'height': '50',
            'font-family': 'Arial',
            'font-size': '18',
            'font-weight': 'normal',
            'content': `data(label)`,
            'text-valign': 'center',
            'text-wrap': 'wrap',
            'text-max-width': '140',
            'background-color': '#60a5fa',
            'border-color': '#2563eb',
            'border-width': '3',
            'color': '#1d3660'
        }
    },
    {
        selector: 'node:selected',
        style: {
            'background-color': '#f97316',
            color: 'white',
            'border-color': '#ea580c',
            'line-color': '#0e76ba',
            'target-arrow-color': '#0e76ba'
        }
    },
    {
        selector: 'edge',
        style: {
            'curve-style': 'bezier',
            'color': 'darkred',
            'text-background-color': '#ffffff',
            'text-background-opacity': '1',
            'text-background-padding': '3',
            'width': '3',
            'target-arrow-shape': 'triangle',
            'line-color': '#1d4ed8',
            'target-arrow-color': '#1d4ed8',
            'font-weight': 'bold'
        }
    },
    {
        selector: 'edge[label]',
        style: {
            'content': `data(label)`,
        }
    },
    {
        selector: 'edge.label',
        style: {
            'line-color': 'orange',
            'target-arrow-color': 'orange'
        }
    }
]
export default styles;
