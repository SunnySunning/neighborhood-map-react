import React from "react";
import * as FetchApi from "./FetchApi";
import PropTypes from 'prop-types';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import escapeRegExp from "escape-string-regexp";
import sizeMe from 'react-sizeme';
import ListCard from "./ListCard";
import LoadingContainer from './LoadingContainer';

export class MapContent extends React.Component {
  static defaultProps = {
    center: {
      lat: 36.100461,
      lng: 120.436026
    },
    zoom: 10
  };

  static propTypes = {
      allUniversities: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showingPlaces: [],
      selectedPlace: {},
      venueData: {},
      mapWidth: {}
    };

    this.updateShowingPlaces = this.updateShowingPlaces.bind(this);
    this.selectPlace = this.selectPlace.bind(this);
    this.unSelectPlace = this.unSelectPlace.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onCloseInfoWindow = this.onCloseInfoWindow.bind(this);
  }

  componentDidMount() {
    this.updateShowingPlaces("");
  }

  updateShowingPlaces = query => {
    let newShowingPlaces = this.state.showingPlaces;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      newShowingPlaces = this.props.allUniversities.filter(place =>
        match.test(place.name)
      );
    } else {
      newShowingPlaces = this.props.allUniversities;
    }

    if (!newShowingPlaces.includes(this.state.selectedPlace)) {
      this.setState({ selectedPlace: {} });
    }

    this.setState({ showingPlaces: newShowingPlaces });
  };

  selectPlace = universityId => {
    this.state.showingPlaces.forEach(place => {
      if (place.universityId === universityId) {
        this.setState({
          selectedPlace: place
        });
      }
    });

    FetchApi.getUniversityDetailById(universityId).then(data => {
      this.setState({ venueData: data });
    }).catch(e => {
        this.setState({ venueData: {status : 'error'} });
    });
  };

  unSelectPlace = () => {
    this.setState({ selectedPlace: {}, venueData: {} });
  };

  onMarkerClick = (props, marker, e) => {
    this.selectPlace(props.id);
  };

  onCloseInfoWindow = () => {
    this.unSelectPlace();
  };

  render() {
    const { showingPlaces, selectedPlace, venueData } = this.state;

    const { width } = this.props.size;

    var infoContent;

    if (!venueData) {
      infoContent = (<div>
        <h6>正在加载</h6>
      </div>)
    }
    else if (venueData.status === "success") {
      infoContent = (<div>
        <h5>
          <a href={venueData.content.canonicalUrl}>{venueData.content.name}</a>
        </h5>
        <h5>{selectedPlace.name}</h5>
      </div>)
    }
    else if (venueData.status === "error") {
      infoContent = (<div>
        <h5>错误码 {venueData.content}</h5>
        <h6>没后找到任何内容!</h6>
      </div>)
    }


    return (
      <Map
        google={this.props.google}
        zoom={this.props.zoom}
        initialCenter={this.props.center}
        mapTypeControl={false}
      >
        {showingPlaces.map(place => {
          let marker = (
            <Marker
              key={place.universityId}
              id={place.universityId}
              name={place.name}
              onClick={this.onMarkerClick}
              position={place.pos}
            />
          );

          return marker;
        })}
        <ListCard
          showingPlaces={this.state.showingPlaces}
          selectedPlace={this.state.selectedPlace}
          onUpdateShowingPlaces={this.updateShowingPlaces}
          onSelectPlace={this.selectPlace}
          mapWidth={width}
        />

        <InfoWindow
          position={
            selectedPlace.pos
          }
          visible={selectedPlace ? true : false}
          onClose={this.onCloseInfoWindow}
        >
          {infoContent}
        </InfoWindow>
      </Map>
    );
  }
}

export default sizeMe()(GoogleApiWrapper({
  apiKey: "AIzaSyCacmIGcWsolGnXLp71cBM_My9axyprocM",
  LoadingContainer: LoadingContainer
})(MapContent));
