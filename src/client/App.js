import React, { useEffect, useState} from "react";
import styled from "styled-components";
import { getEvents } from './services/events';
import { debounce } from './utils';

import EventsTable from './components/EventsTable';
import SearchBox from './components/SearchBox';
import Chart from './components/Chart';

const debounceWrapper = debounce();

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  margin-top: 50px;
  justify-content: center;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  margin: 10px;
  padding: 20px;
`;

const ChartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  alignI-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const App = () => {
  const [networkEvents, setEvents] = useState(null);
  const [networkEventsFilterd, setFilterdEvents] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [timelineChartData, setTimelineChartData] = useState([]);
  const [ipBarChartData, setIpBarChartData] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents();
      setEvents(events);
      setFilterdEvents(events);
    };

    fetchEvents();
  }, [])

  useEffect(() => {
    if(networkEvents) {
      const filterEvents = () => {
        setFilterdEvents(networkEvents.filter(networkEvent => networkEvent.domain.includes(searchText)))
      }
      debounceWrapper(filterEvents, 500);
    }
  }, [searchText])

  useEffect(() => {
    if(networkEventsFilterd) {
      const newChartData = networkEventsFilterd.reduce((acc, curr) => {
        acc[new Date(curr.timestamp).getHours()] = acc[new Date(curr.timestamp).getHours()] ? acc[new Date(curr.timestamp).getHours()] + 1 : 1;

        return acc;
      }, {});

      const newIpBarData = networkEventsFilterd.reduce((acc, curr) => {
        if(curr.event_type === "page_view") {
          acc[curr.ip] = acc[curr.ip] ? acc[curr.ip] + 1 : 1;
        }
    
        return acc;
      }, {});

      const sortedIpBarData = Object.keys(newIpBarData).sort((a, b) => {
        return newIpBarData[b] - newIpBarData[a]
      }).slice(0, 10);
      
      const ipBarData = sortedIpBarData.slice(0, 10).reduce((acc, curr) => {
        acc[curr] = newIpBarData[curr];
    
        return acc;
      }, new Map());
  
      setTimelineChartData(newChartData);
      setIpBarChartData(ipBarData);
    }
  }, [networkEventsFilterd])

  const onSearchTextChange = (event) => {
    setSearchText(event.target.value);
  }

  const onBlacklistFilterClicked = (event) => {
    setFilterdEvents(networkEvents.filter(networkEvent => networkEvent.blacklisted === event.target.checked));
  }

  return (
    <Wrapper>
      <div style={{width: 806}}>
      <Card>
        <SearchBox searchPlaceholder={"Search By Domain"} checkboxText={"Show only blacklist"} onCheckboxClick={onBlacklistFilterClicked} onTextChange={onSearchTextChange} />
        <EventsTable eventsData={networkEventsFilterd} columnsTitles={["IP","Timestamp","Domain","Blacklisted","Event Type"]} />
      </Card>
      </div>
      <ChartsContainer>
        <Card>
          <Chart chartType={"line"} title={'Number of pages views by hours'} chartData={Object.values(timelineChartData)} categories={Object.keys(timelineChartData)} tollTipText={"Views"} />
        </Card>
        <Card>
          <Chart chartType={"bar"} title={'Top 10 IP addresses visited'} chartData={Object.values(ipBarChartData)} categories={Object.keys(ipBarChartData)} tollTipText="Amount Of Visits:" />
        </Card>
      </ChartsContainer>
    </Wrapper>
  );
};

export default App;
