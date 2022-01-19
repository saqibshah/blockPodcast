<div class="audioPlayer" data-media="<?php echo $audio;?>" data-storage="<?php echo 'id_'.md5($audio); ?>">
		<div class="thumbnail">
			<!-- <img src="https://goodepisodes.com/wp-content/uploads/2021/06/dgv-podcast-icon-768x768.jpg" alt=""> -->
			<?php if($attributes['mediaUrl']): ?>
				<img src="<?php echo $attributes['mediaUrl']; ?>" alt="">
			<?php endif; ?>
		</div>
		<div class="player">
			<div class="episodeDetails">
				<!-- EPISODE 195  |  01:26:56 HOURS  |  12.01.2021 -->
				<?php echo $attributes['mainTitle']; ?>
				<!-- Demand Gen Visionaries -->
			</div>
			<h3 class="audioTitle">
				<!-- How to deliver a Story on e TedX stage | Speaking Trainer, TedX Coach  -->
				<?php echo $attributes['audioTitle']; ?>
			</h3>
			<p class="is-mobile-hidden">
				<!-- Our website does both education and conversion and is the way we think about it, but it actually plays all of the  classic roles. It plays as our billboard...	 -->
				<?php echo $attributes['shortDescription']; ?>
			</p>
			<div class="progressContainer">
				<div class="controls">
					
					<!-- <span class="playbackSpeed reverse" data-value="1">1x</span> -->

					<i id="backward" class="ctl-btn fas fa-backward hwBackward"></i>
					
					<span class="btn-bg-container first-time hwPlay" id="play">
						<i class="ctl-btn fas fa-play"></i>
					</span>
					<span class="btn-bg-container hwPause" style="display: none;" id="pause" >
						<i class="ctl-btn fas fa-pause"></i>
					</span>
					
					<i id="forward" class="ctl-btn fas fa-forward hwForward"></i>

					<span class="playbackSpeed" data-value="1">1x</span>
				</div>
				<div class="slider">
					<div class="timer counter">00:00</div>
	
					<div id="draggableBar" class="clickDrag hp_slide">
						
						<div class="hp_range_buffer"></div>
						<div class="hp_buffering" style="display: none;"></div>

						<div class="elDrag hp_range"></div>
					</div>
					
					<div class="timer timerTotal">00:00</div>
				</div>

			</div>
		</div>
		<div class="audio-footer">
			<ul>
				<?php if($hasTimestamps): ?>
					<li data-target="d-timestamps">Timestamps</li>
				<?php endif; ?>
				<li data-target="d-summary">Summary</li>
			</ul>
		</div>
	</div>

	<div class="contentContainer playerOtherDetails" style="display: none;">
        <?php if($hasTimestamps): ?>
			<div class="top-buttons">
				<ul>
					<li class="active" data-load="d-timestamps">Timestamps</li>
					<li data-load="d-summary">Summary</li>
				</ul>
			</div>
		
			<div class="d-timestamps timestamps d-hideable" style="display:none;">
				<ul>
				<?php foreach($attributes['timestamps'] as $v): ?>
						<li class="timestampJumper" data-value="<?php echo $v['startSeconds']; ?>" data-end="<?php echo isset($v['endSeconds']) ? $v['endSeconds'] : false; ?>">
							<div class="ts-progress"></div>
							<div class="ts-left-container">
								<div class="ts-left-container">
									<span class="timestamp-timer"><?php echo $v['start'];?></span>
									<span class="timestamp-title"><?php echo $v['title'];?></span>
								</div>
							</div>
							<span class="timestamp-control play"><i class="ctl-btn fas fa-play"></i></span>
							<span class="timestamp-control pause"><i class="ctl-btn fas fa-pause"></i></span>
						</li>
					<?php endforeach; ?>

				</ul>
			</div>

		<?php endif; ?>
        <div class="d-hideable d-summary <?php echo (!$hasTimestamps) ? 'no-timestamps' : ''; ?> summary" style="<?php echo $hasTimestamps ? 'display:none;' : ''; ?>">
			<?php echo $attributes['itemDesc']; ?>
        </div>
        <div class="portablePlayer-container">
            <div class="portablePlayer">
                <div class="mobile-content">
                    <p>How to deliver a Story on 
                    TedX stage | Speaking 
                    Trainer, TedX Coach </p>
                </div>
                <div class="controls">
					
					<!-- <span class="playbackSpeed reverse" data-value="1">1x</span> -->

					<i id="backward" class="ctl-btn fas fa-backward hwBackward"></i>
					
					<span class="btn-bg-container first-time hwPlay" id="play">
						<i class="ctl-btn fas fa-play"></i>
					</span>
					<span class="btn-bg-container hwPause" style="display: none;" id="pause" >
						<i class="ctl-btn fas fa-pause"></i>
					</span>
					
					<i id="forward" class="ctl-btn fas fa-forward hwForward"></i>
				</div>
            </div>

        </div>

	</div>

	<div class="contentContainer is-mobile-hidden">
		<?php if($hasTimestamps): ?>
			<div class="top-buttons desktop-buttons">
				<ul>
					<li class="active" data-load="d-timestamps">Timestamps</li><li data-load="d-summary">Summary</li>
				</ul>
			</div>
			<!-- <div class="timestamps"> -->
			<div class="d-timestamps timestamps d-hideable">
				<ul>
					<?php foreach($attributes['timestamps'] as $v): ?>
						<li class="timestampJumper" data-value="<?php echo $v['startSeconds']; ?>" data-end="<?php echo isset($v['endSeconds']) ? $v['endSeconds'] : false; ?>">
							<div class="ts-progress"></div>
							<div class="ts-left-container">
								<div class="ts-left-container">
									<span class="timestamp-timer"><?php echo $v['start'];?></span>
									<span class="timestamp-title"><?php echo $v['title'];?></span>
								</div>
							</div>
							<span class="timestamp-control play"><i class="ctl-btn fas fa-play"></i></span>
							<span class="timestamp-control pause"><i class="ctl-btn fas fa-pause"></i></span>
						</li>
					<?php endforeach; ?>
				</ul>
			</div>
		<?php endif; ?>
		<div class="d-hideable d-summary d-summary-desktop summary" style="<?php echo $hasTimestamps ? 'display:none;' : ''; ?>">
			<?php echo $attributes['itemDesc']; ?>
        </div>
	</div>