import React, { useEffect } from 'react';
import Developer from '../Developer';
import { withTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { withRouter } from 'react-router-dom';

import './DevelopersTeam.scss';
import { DeveloperModel } from 'store/types';
import { connect } from 'react-redux';
import { Dispatch, compose } from 'redux';
import { RootAction, fetchDevelopersList } from '../../actions';
import Progress from '../../styled-components/loading/progress';
import { ReducerState } from '../../store/types';

interface IDevelopersTeamProps {
	t: (namespace: string) => string;
	fetchDevelopersList: () => DeveloperModel[];
	developersList: DeveloperModel[];
	isDevelopersLoading: boolean;
}

const DevelopersTeam: React.FC<IDevelopersTeamProps> = ({ t, fetchDevelopersList, developersList, isDevelopersLoading }) => {
	useEffect(() => {
		fetchDevelopersList();
	}, [fetchDevelopersList]);

	if (isDevelopersLoading) {
		return (
			<Box className={'progress-container'}>
				<Progress type='circular' size={100}/>
			</Box>
		);
	}

	return (
		<Box component='section' className={'developers-team'}>
			<Grid container justify='center' alignContent='center' spacing={2}>
				<Grid item xs={12}>
					<Typography variant='h3' component='h2' gutterBottom className='h2'>
						{t('developersTeam.heading').toUpperCase()}
					</Typography>
				</Grid>
				{
					developersList.map((developer) => (
						<Grid item xs={'auto'} sm={'auto'} md={4} key={developer.githubUrl}>
							<Developer
								name={developer.name}
								linkToGithub={developer.githubUrl}
								linkToImage={developer.imageUrl}
								contribution={developer.contribution}
							/>
						</Grid>
					))
				}
			</Grid>
		</Box>
	);
};

const mapStateToProps = (state: ReducerState) => {
	if (state.isDevelopersLoading) {
		return {
			isDevelopersLoading: state.isDevelopersLoading
		};
	}

	return {
		developersList: state.developersList,
		isDevelopersLoading: state.isDevelopersLoading
	};
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): object => {
	return {
		fetchDevelopersList: fetchDevelopersList(dispatch)
	};
};

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
	withTranslation('common')
)(DevelopersTeam) as React.ComponentType;
