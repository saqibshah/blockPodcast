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
	Dashicon,
	__experimentalHStack as HStack,
    __experimentalSpacer as Spacer,
	__experimentalDivider as Divider,

} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

import './editor.scss';

// Card
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    __experimentalText as Text,
    __experimentalHeading as Heading,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {

	// console.log('ATT: ',attributes);
	// console.log('setAtt: ',setAttributes);
	
	const onSubmitURL = ( event ) => {
		event.preventDefault();
		const { podcastURL } = attributes;
		// console.log(podcastURL);
		
		setAttributes({isLoading: true});
		apiFetch( {
			path: '/ss-podcast/v1/getxml/' + btoa( podcastURL ),
			method: 'POST',
			data: { url: btoa( podcastURL ) },
		} )
			.then( ( resp ) => {
				// console.log( resp );
				// console.log(resp["items"]);
				const respOptns = [
					{
						label: 'Choose Episode',
						value: '',
					},
					...resp[ 'items' ],
				];
				// console.log( respOptns );
				setAttributes( {
					mainTitle: resp.title,
					mainDesc: resp.description,
					// podcastEpisodes: resp.items,
					podcastEpisodes: respOptns,
					mediaUrl: resp.image.url ? resp.image.url : '',
					mediaId: 0,
					mediaObj: undefined,
					timestamps: attributes.timestamps ? attributes.timestamps : [],
					isLoading: false,
				} );
			} )
			.catch( ( error ) => {
				console.log( error );
			} );
	};

	const onFetchChange = ( value ) => {
		if ( value ) {
			const parseVal = JSON.parse( value );
			// console.log( parseVal.description );
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
		// console.log( media );
	};
	
	const deleteAllTimestamps = () => {

		const timestamps = [];
		setAttributes( { timestamps } );

	};
	const sortTimestamps = () => {

		const timestamps = [ ...attributes.timestamps ];
		// sort!!!!
		timestamps.sort(function (a, b) {
			return a.startSeconds - b.startSeconds;
		});

		timestamps.map( ( v, index ) => {
			if(index+1 < timestamps.length){
				timestamps[index]['endSeconds'] = timestamps[index+1]['startSeconds'] - 1;
				// console.log(timestamps[index]);
			}else{
				// last
			}
		});
		
		setAttributes( { timestamps } );

	};
	const onTimestamps = () => {

		const timestamps = [ ...attributes.timestamps ];
		timestamps.push( {
			start: '', 
			title : '',
			startSeconds: false,
			endSeconds:false,
		} );
		setAttributes( { timestamps } );

	};

	const handleRemoveTimestamp = ( index ) => {
		const timestamps = [ ...attributes.timestamps ];
		timestamps.splice( index, 1 );
		setAttributes( { timestamps } );
	};
	const handleTimestampUpdate = ( value, index, key ) => {

		const timestamps = [ ...attributes.timestamps ];
		timestamps[index][key] = value;
		let validate = false;

		if(key == 'start'){
			
			let seconds;
			var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])|([0-1]?[0-9]|2[0-4]):([0-5][0-9])?$/.test(value);
			if(!isValid){
				timestamps[index]['error'] = true;
				timestamps[index]['startSeconds'] = false;
			}else{
				timestamps[index]['is_valid'] = false;
				let time = value.split(':');
				console.log(time.length);
				seconds = time.length > 2 ? (time[0] * 3600 + time[1] * 60 + time[2]*1) : (time[0] * 60 + time[1]*1);
				timestamps[index]['error'] = false;
				timestamps[index]['startSeconds'] = seconds;
				validate=true;
				// sort
			}
			// console.log('Validate Time: ', isValid, timestamps[index]['startSeconds']);
		}
		setAttributes( { timestamps } );
		if(validate) sortTimestamps();
	};

	// console.log('Timestamps::: ', attributes.timestamps);
	let timestampHeading;
	let timestampsDisplay;

	if(attributes.timestamps && attributes.timestamps.length > 0){
		timestampsDisplay = attributes.timestamps.map( ( v, index ) => {
			return (
				<div>
					
					<Spacer marginBottom={2} marginTop={4}>

						<HStack key={index}>
							{/* <Text>{index +1}</Text> */}
							<TextControl
								placeholder={ __( 'hh:mm:ss - Start', 'ss-podcast' ) }
								value={v.start}
								onChange={ (value) => handleTimestampUpdate(value, index, 'start')}
								// label= {index == 0 ? 'Start Time' : ''}
							/>
			
							<TextControl
								placeholder={ __( 'Title', 'ss-podcast' ) }
								value={ v.title }
								onChange={ (value) => handleTimestampUpdate(value, index, 'title')}
								// label= {index == 0 ? 'Timestamp Title' : ''}
							/>
							
							<Dashicon icon="admin-home" 
								className="grf__remove-location-address"
								icon="	dashicons-remove"
								label="RemoveDelete"
								onClick={ () => handleRemoveTimestamp( index ) }
							/>
						</HStack>
					</Spacer>
					<Divider margin={0}   />

				</div>
			);
		} );
		// console.log('ret:::', 'nothign');

		timestampHeading =(	
			<div>
				<Spacer marginBottom={3}>
					<HStack>
						<Text><strong>Start Time</strong></Text>
						<Text><strong>Title</strong></Text>
						<Text><strong></strong></Text>
					</HStack>
				</Spacer>
				<Divider />
			</div>
		);
	}

	if(!('timestamps' in attributes) || attributes.timestamps === undefined){
		attributes.timestamps = [];
		setAttributes({timestamps:[]});
	}
	
		let podcastBody;
		if(attributes.isLoading){
			podcastBody = (
				<div className='text-center'>
					<Text>Loading Please Wait ...</Text>
				</div>	
			);
		}
		else if(!attributes.mediaUrl){
			podcastBody = (
				<div className='text-center'>
					<Text>Add feed url and press "Pull Data"</Text>
				</div>	
			);
		}
		else{

			podcastBody = (
				<div>
					<PanelBody title="Podcast Details">
						
						<SelectControl
							label={ __( 'Podcast Episodes', 'ss-podcast' ) }
							value={ attributes.episodesSelected }
							onChange={ onFetchChange }
							options={ attributes.podcastEpisodes }
							className={'select-episode'}
						/>
						
						<TextControl
							label={ __( 'Podcast Top Text', 'ss-podcast' ) }
							placeholder={ __( 'Podcast Title', 'ss-podcast' ) }
							value={ attributes.mainTitle }
							onChange={ ( value ) =>
								setAttributes( { mainTitle: value } )
							}
							className={ 'components-placeholder__input' }
						/>
						
						<TextControl
							label={ __( 'Audio Title', 'ss-podcast' ) }
							placeholder={ __( 'Audio Title', 'ss-podcast' ) }
							value={ attributes.audioTitle }
							onChange={ ( value ) =>
								setAttributes( { audioTitle: value } )
							}
							className={ 'components-placeholder__input' }
						/>
					</PanelBody>
					<PanelBody title="Podcast Description">	
						<TextareaControl
							label={ __( 'Short Description', 'ss-podcast' ) }
							placeholder={ __( 'Short Description', 'ss-podcast' ) }
							value={ attributes.shortDescription }
							onChange={ ( value ) =>
								setAttributes( { shortDescription: value } )
							}
							className={ 'components-placeholder__input' }
						/>

						{/* <TextareaControl
							label={ __( 'Podcast Description', 'ss-podcast' ) }
							value={ attributes.mainDesc }
							onChange={ ( value ) =>
								setAttributes( { mainDesc: value } )
							}
						/> */}
						<Text><strong>Description</strong></Text>
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

					<PanelBody title={ __( 'Timestamps ('+ attributes.timestamps.length +')' ) }>		
						<Card>
							<CardBody>
								{timestampHeading}
								{timestampsDisplay}
								<Spacer marginBottom={6}></Spacer>
								
								<HStack>
									<Button 
										isDestructive
										onClick={ deleteAllTimestamps.bind( this ) }
									>
										{ __( 'Delete All' ) }
									</Button>
									
									<div>
										<Button 
											variant="secondary"
											onClick={ sortTimestamps.bind( this ) }
										>
											{ __( 'Sort' ) }
										</Button>
										<Button 
											isDefault 
											onClick={ onTimestamps.bind( this ) }
										>
											{ __( 'Add Timestamp' ) }
										</Button>
									</div>
								</HStack>

							</CardBody>
						</Card>

					</PanelBody>
				</div>
			);
		}
		
		

		return (
			<div { ...useBlockProps() }>
				<Card>
					<CardBody>
						<PanelBody title="Feed URL">
							<form onSubmit={ onSubmitURL }>
								<TextControl
									Card={ __( 'Enter URL here…', 'ss-podcast' ) }
									value={ attributes.podcastURL }
									onChange={ ( value ) =>
										setAttributes( { podcastURL: value } )
									}
									label="Enter Feed URL"
									className={ 'components-placeholder__input' }
								/>
								<Button isDefault type="submit">
									{ __( 'Pull Data', 'ss-podcast' ) }
								</Button>
							</form>
						</PanelBody>
						{podcastBody}
						
					</CardBody>
				</Card>
				
				<InspectorControls>
					<PanelBody
						initialOpen={ true }
						title={ __( 'Podcast Thumbnail', 'ss-podcast' ) }
					>
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
	
					</PanelBody>
				</InspectorControls>
			</div>
		);
}
