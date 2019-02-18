import React from "react";

export default class ListCard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      query: "",
      showListCard: true
    };
  }

  componentDidMount() {
    this.updateIsShow();
  }

  updateIsShow () {
    if (this.props.mapWidth < 750) {
      this.setState({ showListCard: false });
    }
  }

  updateQuery = newQuery => {
    this.setState({ query: newQuery });
    this.props.onUpdateShowingPlaces(newQuery);
  };

  hideListCard = event => {
    this.setState({ showListCard: !this.state.showListCard });
  }

  clickItem = event => {
    this.props.onSelectPlace(event.target.dataset.id);
    this.hideListCard();
  };

  render() {
    const { showingPlaces, selectedPlace } = this.props;
    const { query } = this.state;

    return (
      <div
        className="card border-secondary"
        id="item-list">

        <div className="card-header">
          <button className="btn btn-info"
            onClick={this.hideListCard}>{this.state.showListCard ? "▼" : "▲"}</button>
          <h5>Universities in QingDao</h5>
        </div>
        <div
          className={this.state.showListCard ? "card-body" : "hidden"}
          >
          <input
            type="text"
            className="form-control"
            placeholder="查询"
            value={query}
            onChange={event => this.updateQuery(event.target.value)}
          />
        </div>
        <ul className={this.state.showListCard ? "list-group list-group-flush" : "hidden"}>
          {showingPlaces.map(place => (
            <li key={place.universityId}>
              <button
                className={
                  place.universityId === selectedPlace.universityId
                    ? "list-group-item active"
                    : "list-group-item"
                }
                data-id={place.universityId}
                onClick={this.clickItem}>{place.name}</button>
            </li>
          ))}
        </ul>

      </div>
    );
  }
}
