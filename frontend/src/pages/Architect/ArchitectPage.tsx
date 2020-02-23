import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, compose } from 'redux';
import { withRouter } from 'react-router-dom';

import BasicInfo from '../../components/Basic-info';
import Biography from '../../components/Biography';
import WorksList from '../../components/Works-list';
import Gallery from '../../components/Gallery';
import Youtube from '../../components/Youtube';
import Map from '../../components/Map';

import { fetchAuthor, RootAction } from '../../actions';

import './ArchitectPage.scss';
import { ReducerState } from '../../store/types';
import { Work, LifeEvent } from '../../store/types';

interface ArchitectPageProps {
	fetchAuthor: (id: string) => object;
	match: MatchModel;
	videoUrl: string;
	name: string;
	pictureUrl: string;
	summary: string;
	isLoading: boolean;
	birthPlace: string;
	birthdate: string;
	deathDate: string;
	works: Work[];
	lifeEvents: LifeEvent[];
}

interface MatchModel {
	params: { id: string };
}

const ArchitectPage: React.FC<ArchitectPageProps> = (props) => {
	const {
		fetchAuthor,
		match,
		name,
		pictureUrl,
		summary,
		isLoading,
		birthdate,
		deathDate,
		birthPlace,
		works,
		videoUrl
	} = props;

	useEffect(() => {
		fetchAuthor(match.params.id);
	}, [fetchAuthor]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<BasicInfo
				name={name}
				pictureUrl={pictureUrl}
				summary={summary}
				birthPlace={birthPlace}
				birthDate={birthdate}
				deathDate={deathDate}
			/>
			<Biography />
			{works && <WorksList works={works} />}
			{works && <Gallery works={works} />}
			{works && <Map works={works} />}
			{videoUrl && <Youtube	videoUrl={videoUrl} />}
		</div>
	);
};

const mapStateToProps = (state: ReducerState) => {
	if (state.isAuthorLoading) {
		return {
			isLoading: state.isAuthorLoading
		};
	}

	return {
		name: state.author.name,
		pictureUrl: state.author.pictureUrl,
		summary: state.author.summary,
		isLoading: state.isAuthorLoading,
		birthdate: state.author.birthdate,
		deathDate: state.author.deathDate,
		birthPlace: state.author.birthPlace,
		works: state.author.works,
		lifeEvents: state.author.lifeEvents,
		videoUrl: state.author.videoUrl
	};
};

const mapDispatchToProps = (
	dispatch: Dispatch<RootAction>
): any => { // !!! fix type
	return {
		fetchAuthor: fetchAuthor(dispatch)
	};
};

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(ArchitectPage) as React.ComponentType;
