// import the library
import { library } from '@fortawesome/fontawesome-svg-core';

import { Howl, Howler } from 'howler';

import { RichText } from '@wordpress/block-editor';

// import your icons
import {
	faCode,
	faHighlighter,
	faBackward,
	faPlay,
	faPause,
	faForward,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(
	faCode,
	faHighlighter,
	faBackward,
	faPlay,
	faPause,
	faForward
	// more icons go here
);

export default function ss_player( attributes ) {
	console.log( attributes );
	return (
		<div>
			<div class="audioPlayer">
				<div class="thumbnail">
					<img src={ attributes.mediaUrl } alt="" />
				</div>
				<div class="player">
					<div class="episodeDetails">{ attributes.mainTitle }</div>
					<h3 class="audioTitle">
						How to deliver a Story on e TedX stage | Speaking
						Trainer, TedX Coach
					</h3>
					<p class="is-mobile-hidden">
						Our website does both education and conversion and is
						the way we think about it, but it actually plays all of
						the classic roles. It plays as our billboard...
					</p>
					<div class="progressContainer">
						<div class="controls">
							<FontAwesomeIcon
								id="backward"
								className="ctl-btn hwBackward"
								icon={ faBackward }
							/>

							<span
								class="btn-bg-container first-time hwPlay"
								id="play"
							>
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPlay }
								/>
							</span>
							<span
								class="btn-bg-container hwPause"
								style="display: none;"
								id="pause"
							>
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPause }
								/>
							</span>

							<FontAwesomeIcon
								className="ctl-btn hwForward"
								icon={ faForward }
								id="forward"
							/>

							<span class="playbackSpeed" data-value="1">
								1x
							</span>
						</div>
						<div class="slider">
							<div class="timer counter">00:00</div>

							<div class="hp_slide">
								<div class="hp_range_buffer"></div>
								<div
									class="hp_buffering"
									style="display: none;"
								></div>
								<div class="hp_range"></div>
							</div>

							<div class="timer timerTotal">00:00</div>
						</div>
					</div>
				</div>
				<div class="audio-footer">
					<ul>
						<li data-target="d-timestamps">Timestamps</li>
						<li data-target="d-summary">Summary</li>
					</ul>
				</div>
			</div>

			<div
				class="contentContainer playerOtherDetails"
				style="display: none;"
			>
				<div class="top-buttons">
					<ul>
						<li class="active" data-load="d-timestamps">
							Timestamps
						</li>
						<li data-load="d-summary">Summary</li>
					</ul>
				</div>
				<div
					class="d-timestamps timestamps d-hideable"
					style="display:none;"
				>
					<ul>
						<li
							class="timestampJumper"
							data-value="0"
							data-end="135"
						>
							<div class="ts-progress"></div>
							<div class="ts-left-container">
								<div class="ts-left-container">
									<span class="timestamp-timer">00:00</span>
									<span class="timestamp-title">
										Introduction
									</span>
								</div>
							</div>
							<span class="timestamp-control play">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPlay }
								/>
							</span>
							<span class="timestamp-control pause">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPause }
								/>
							</span>
						</li>

						<li
							class="timestampJumper"
							data-value="135"
							data-end="211"
						>
							<div class="ts-progress"></div>
							<div class="ts-left-container">
								<span class="timestamp-timer">02:15</span>
								<span class="timestamp-title">
									Nikhil’s first role in marketing
								</span>
							</div>
							<span class="timestamp-control play">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPlay }
								/>
							</span>
							<span class="timestamp-control pause">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPause }
								/>
							</span>
						</li>

						<li
							class="timestampJumper"
							data-value="211"
							data-end="250"
						>
							<div class="ts-progress"></div>
							<div class="ts-left-container">
								<span class="timestamp-timer">03:31</span>
								<span class="timestamp-title">
									Nikhil’s current role as CMO at FICO
								</span>
							</div>
							<span class="timestamp-control play">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPlay }
								/>
							</span>
							<span class="timestamp-control pause">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPause }
								/>
							</span>
						</li>

						<li
							class="timestampJumper"
							data-value="250"
							data-end="352"
						>
							<div class="ts-progress"></div>
							<div class="ts-left-container">
								<span class="timestamp-timer">09:10</span>
								<span class="timestamp-title">
									Segment: The Trust Tree
								</span>
							</div>
							<span class="timestamp-control play">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPlay }
								/>
							</span>
							<span class="timestamp-control pause">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPause }
								/>
							</span>
						</li>
						<li
							class="timestampJumper"
							data-value="352"
							data-end="559"
						>
							<div class="ts-progress"></div>
							<div class="ts-left-container">
								<span class="timestamp-timer">09:10</span>
								<span class="timestamp-title">
									What the buying committee looks like for
									FICO
								</span>
							</div>
							<span class="timestamp-control play">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPlay }
								/>
							</span>
							<span class="timestamp-control pause">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPause }
								/>
							</span>
						</li>
						<li
							class="timestampJumper"
							data-value="559"
							data-end="637"
						>
							<div class="ts-progress"></div>
							<div class="ts-left-container">
								<span class="timestamp-timer">09:10</span>
								<span class="timestamp-title">
									Nikhil’s marketing strategy
								</span>
							</div>
							<span class="timestamp-control play">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPlay }
								/>
							</span>
							<span class="timestamp-control pause">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPause }
								/>
							</span>
						</li>
						<li
							class="timestampJumper"
							data-value="637"
							data-end="746"
						>
							<div class="ts-progress"></div>
							<div class="ts-left-container">
								<span class="timestamp-timer">09:10</span>
								<span class="timestamp-title">
									The way Nikhil organizes his marketing team
								</span>
							</div>
							<span class="timestamp-control play">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPlay }
								/>
							</span>
							<span class="timestamp-control pause">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPause }
								/>
							</span>
						</li>
						<li
							class="timestampJumper"
							data-value="746"
							data-end="1058"
						>
							<div class="ts-progress"></div>
							<div class="ts-left-container">
								<span class="timestamp-timer">09:10</span>
								<span class="timestamp-title">
									Segment: The Playbook
								</span>
							</div>
							<span class="timestamp-control play">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPlay }
								/>
							</span>
							<span class="timestamp-control pause">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPause }
								/>
							</span>
						</li>

						<li
							class="timestampJumper"
							data-value="1058"
							data-end="1298"
						>
							<div class="ts-progress"></div>
							<div class="ts-left-container">
								<span class="timestamp-timer">09:10</span>
								<span class="timestamp-title">
									How Nikhil craft’s his customer testimonials
								</span>
							</div>
							<span class="timestamp-control play">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPlay }
								/>
							</span>
							<span class="timestamp-control pause">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPause }
								/>
							</span>
						</li>
						<li
							class="timestampJumper"
							data-value="1298"
							data-end="1608"
						>
							<div class="ts-progress"></div>
							<div class="ts-left-container">
								<span class="timestamp-timer">09:10</span>
								<span class="timestamp-title">
									How Nikhil thinks about FICO’s website
								</span>
							</div>
							<span class="timestamp-control play">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPlay }
								/>
							</span>
							<span class="timestamp-control pause">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPause }
								/>
							</span>
						</li>
						<li
							class="timestampJumper"
							data-value="1608"
							data-end="1747"
						>
							<div class="ts-progress"></div>
							<div class="ts-left-container">
								<span class="timestamp-timer">09:10</span>
								<span class="timestamp-title">
									Tips on creating curated events
								</span>
							</div>
							<span class="timestamp-control play">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPlay }
								/>
							</span>
							<span class="timestamp-control pause">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPause }
								/>
							</span>
						</li>
						<li
							class="timestampJumper"
							data-value="1747"
							data-end="1910"
						>
							<div class="ts-progress"></div>
							<div class="ts-left-container">
								<span class="timestamp-timer">09:10</span>
								<span class="timestamp-title">
									What it’s like being a serial entrepreneur
									and CMO
								</span>
							</div>
							<span class="timestamp-control play">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPlay }
								/>
							</span>
							<span class="timestamp-control pause">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPause }
								/>
							</span>
						</li>
						<li
							class="timestampJumper"
							data-value="1910"
							data-end="2040"
						>
							<div class="ts-progress"></div>
							<div class="ts-left-container">
								<span class="timestamp-timer">09:10</span>
								<span class="timestamp-title">
									Segment: The Dust Up
								</span>
							</div>
							<span class="timestamp-control play">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPlay }
								/>
							</span>
							<span class="timestamp-control pause">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPause }
								/>
							</span>
						</li>
						<li
							class="timestampJumper"
							data-value="2040"
							data-end="2221"
						>
							<div class="ts-progress"></div>
							<div class="ts-left-container">
								<span class="timestamp-timer">09:10</span>
								<span class="timestamp-title">
									Segment: Quick Hits
								</span>
							</div>
							<span class="timestamp-control play">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPlay }
								/>
							</span>
							<span class="timestamp-control pause">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPause }
								/>
							</span>
						</li>
					</ul>
				</div>
				<div class="d-hideable d-summary summary" style="display:none;">
					<RichText.Content
						tagName="div"
						value={ attributes.itemDesc }
					/>
				</div>
				<div class="portablePlayer-container">
					<div class="portablePlayer">
						<div class="mobile-content">
							<p>
								How to deliver a Story on TedX stage | Speaking
								Trainer, TedX Coach{ ' ' }
							</p>
						</div>
						<div class="controls">
							<FontAwesomeIcon
								className="ctl-btn hwBackward"
								icon={ faBackward }
								id="backward"
							/>

							<span
								class="btn-bg-container first-time hwPlay"
								id="play"
							>
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPlay }
								/>
							</span>
							<span
								class="btn-bg-container hwPause"
								style="display: none;"
								id="pause"
							>
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPause }
								/>
							</span>

							<FontAwesomeIcon
								className="ctl-btn hwForward"
								icon={ faForward }
								id="forward"
							/>
						</div>
					</div>
				</div>
			</div>

			<div class="contentContainer is-mobile-hidden">
				<div class="timestamps">
					<ul>
						<li
							class="timestampJumper"
							data-value="0"
							data-end="359"
						>
							<div class="ts-left-container">
								<span class="timestamp-timer">00:00</span>
								<span class="timestamp-control play">
									<FontAwesomeIcon
										className="ctl-btn"
										icon={ faPlay }
									/>
								</span>
							</div>
							<span class="timestamp-control pause">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPause }
								/>
							</span>
							<span class="timestamp-title">Introduction</span>
						</li>

						<li
							class="timestampJumper"
							data-value="360"
							data-end="549"
						>
							<div class="ts-left-container">
								<span class="timestamp-timer">06:00</span>
								<span class="timestamp-control play">
									<FontAwesomeIcon
										className="ctl-btn"
										icon={ faPlay }
									/>
								</span>
							</div>
							<span class="timestamp-control pause">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPause }
								/>
							</span>
							<span class="timestamp-title">Great Question</span>
						</li>

						<li
							class="timestampJumper"
							data-value="550"
							data-end="2221"
						>
							<div class="ts-left-container">
								<span class="timestamp-timer">09:10</span>
								<span class="timestamp-control play">
									<FontAwesomeIcon
										className="ctl-btn"
										icon={ faPlay }
									/>
								</span>
							</div>
							<span class="timestamp-control pause">
								<FontAwesomeIcon
									className="ctl-btn"
									icon={ faPause }
								/>
							</span>
							<span class="timestamp-title">
								Another great question
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
