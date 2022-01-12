/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */

import ss_player from './template/player';

export default function save( { attributes } ) {
	const blockProps = useBlockProps.save( { className: 'alignwide' } );

	const slectedEpisode =
		attributes.podcastEpisodes && attributes.podcastEpisodes.length > 0
			? attributes.podcastEpisodes.filter(
					( episode ) => episode.value === attributes.episodesSelected
			  )
			: '';

	return (
		<div { ...blockProps }>
			{/* <p>{ attributes.podcastURL }</p> */}
			{ attributes.podcastEpisodes &&
				attributes.podcastEpisodes.length > 0 && (
					<div>
						{ /* <p>
						{slectedEpisode[0].label} ({slectedEpisode[0].value})
					</p> */ }
						{ ss_player( attributes ) }
						{ /* {attributes.podcastEpisodes.map((episode, index) => {
						return (
							<li key={index}>
								<a href={episode.value}>{episode.label}</a>
							</li>
						);
					})} */ }
					</div>
				) }
		</div>
	);
}
