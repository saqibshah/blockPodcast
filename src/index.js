/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import './style.scss';
/**
 * Internal dependencies
 */
import './adminstyle.scss';
// import './style.scss';
import './player.scss'; 
import Edit from './edit';
import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( 'create-block/ss-podcast', {
	attributes: {
		podcastURL: {
			type: 'string',
		},
		podcastEpisodes: {
			type: 'array',
		},
		episodesSelected: {
			type: 'string',
		},
		mediaId: {
			type: 'number',
			default: 0,
		},
		mediaUrl: {
			type: 'string',
			default: '',
		},
		mediaObj: {
			type: 'object',
		},
		mainTitle: {
			type: 'string',
			default: '',
		},
		timestamps: {
			type: 'array',
		},
		audioTitle: {
			type: 'string',
			default: '',
		},
		shortDescription: {
			type: 'string',
			default: '',
		},
		mainDesc: {
			type: 'string',
			default: '',
		},
		itemDesc: {
			type: 'string',
			default: '',
		},
		alignment: {
			type: 'string',
			default: 'none',
		},
	},
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
