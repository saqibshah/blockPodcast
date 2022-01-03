import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
} from '@wordpress/block-editor';
import {
	SelectControl,
	PanelBody,
	Button,
	Placeholder,
	TextControl,
	ResponsiveWrapper,
	TextareaControl,
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const onSubmitURL = ( event ) => {
		event.preventDefault();
		const { podcastURL } = attributes;
		// console.log(podcastURL);

		apiFetch( {
			path: '/ss-podcast/v1/getxml/' + btoa( podcastURL ),
			method: 'POST',
			data: { url: btoa( podcastURL ) },
		} )
			.then( ( resp ) => {
				console.log( resp );
				// console.log(resp["items"]);
				const respOptns = [
					{
						label: 'Choose Episode',
						value: '',
					},
					...resp[ 'items' ],
				];
				console.log( respOptns );
				setAttributes( {
					mainTitle: resp.title,
					mainDesc: resp.description,
					// podcastEpisodes: resp.items,
					podcastEpisodes: respOptns,
					mediaUrl: resp.image.url ? resp.image.url : '',
					mediaId: 0,
					mediaObj: undefined,
				} );
			} )
			.catch( ( error ) => {
				console.log( error );
			} );
	};

	const onFetchChange = ( value ) => {
		if ( value ) {
			const parseVal = JSON.parse( value );
			console.log( parseVal.description );
			setAttributes( {
				episodesSelected: value,
				itemDesc: parseVal.description,
			} );
			return;
		}
		setAttributes( { episodesSelected: '', itemDesc: '' } );
	};

	const removeMedia = () => {
		setAttributes( {
			mediaId: 0,
			mediaUrl: '',
			mediaObj: undefined,
		} );
	};

	const onSelectMedia = ( media ) => {
		setAttributes( {
			mediaId: media.id,
			mediaUrl: media.url,
			mediaObj: media,
		} );
		console.log( media );
	};

	return (
		<div { ...useBlockProps() }>
			<Placeholder>
				<form onSubmit={ onSubmitURL }>
					<TextControl
						placeholder={ __( 'Enter URL here…', 'ss-podcast' ) }
						value={ attributes.podcastURL }
						onChange={ ( value ) =>
							setAttributes( { podcastURL: value } )
						}
						className={ 'components-placeholder__input' }
					/>
					<Button isLarge type="submit">
						{ __( 'Use URL', 'ss-podcast' ) }
					</Button>
				</form>
			</Placeholder>

			<InspectorControls>
				<PanelBody
					initialOpen={ true }
					title={ __( 'Podcast Details', 'ss-podcast' ) }
				>
					<TextControl
						label={ __( 'Podcast Title', 'ss-podcast' ) }
						placeholder={ __( 'Podcast Title', 'ss-podcast' ) }
						value={ attributes.mainTitle }
						onChange={ ( value ) =>
							setAttributes( { mainTitle: value } )
						}
						className={ 'components-placeholder__input' }
					/>

					<TextareaControl
						label={ __( 'Podcast Description', 'ss-podcast' ) }
						value={ attributes.mainDesc }
						onChange={ ( value ) =>
							setAttributes( { mainDesc: value } )
						}
					/>

					<div className="editor-post-featured-image components-base-control">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ onSelectMedia }
								value={ attributes.mediaId }
								allowedTypes={ [ 'image' ] }
								render={ ( { open } ) => (
									<Button
										className={
											attributes.mediaId == 0
												? 'editor-post-featured-image__preview'
												: 'editor-post-featured-image__preview'
										}
										onClick={ open }
									>
										{ attributes.mediaId == 0 && (
											<div>
												<ResponsiveWrapper
													naturalWidth={ 500 }
													naturalHeight={ 400 }
												>
													<img
														src={
															attributes.mediaUrl
														}
														style={ {
															maxHeight: '100%',
														} }
													/>
												</ResponsiveWrapper>
												{ __(
													'Click to choose different Featured Image',
													'ss-podcast'
												) }
											</div>
										) }
										{ attributes.mediaObj != undefined && (
											<ResponsiveWrapper
												naturalWidth={
													attributes.mediaObj.width
												}
												naturalHeight={
													attributes.mediaObj.height
												}
											>
												<img
													src={
														attributes.mediaObj.url
													}
												/>
											</ResponsiveWrapper>
										) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
						{ attributes.mediaId != 0 && (
							<MediaUploadCheck>
								<MediaUpload
									title={ __(
										'Replace image',
										'ss-podcast'
									) }
									value={ attributes.mediaId }
									onSelect={ onSelectMedia }
									allowedTypes={ [ 'image' ] }
									render={ ( { open } ) => (
										<Button
											onClick={ open }
											isDefault
											isLarge
										>
											{ __(
												'Replace image',
												'ss-podcast'
											) }
										</Button>
									) }
								/>
							</MediaUploadCheck>
						) }
						{ attributes.mediaId != 0 && (
							<MediaUploadCheck>
								<Button
									onClick={ removeMedia }
									isLink
									isDestructive
								>
									{ __( 'Remove image', 'ss-podcast' ) }
								</Button>
							</MediaUploadCheck>
						) }
					</div>

					<SelectControl
						label={ __( 'Fetched Podcast Episodes', 'ss-podcast' ) }
						value={ attributes.episodesSelected }
						onChange={ onFetchChange }
						options={ attributes.podcastEpisodes }
					/>

					{ /* <TextareaControl
						label={ __( 'Episode Description', 'ss-podcast' ) }
						value={ attributes.itemDesc }
						onChange={ ( itemDesc ) =>
							setAttributes( { itemDesc } )
						}
						rows={ 15 }
					/> */ }

					<RichText
						tagName="div"
						multiline="p"
						value={ attributes.itemDesc }
						onChange={ ( itemDesc ) =>
							setAttributes( { itemDesc } )
						}
						placeholder="Episode Description"
					/>
				</PanelBody>
			</InspectorControls>
		</div>
	);
}
