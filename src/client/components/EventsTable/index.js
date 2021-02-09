import React, { useState, useRef} from 'react';
import styled from "styled-components";

const Table = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
`;

const TableHeader = styled.div`
    background: linear-gradient(60deg, #ffa726, #fb8c00);
    color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

const ColumnTitle = styled.h3``;

const TableBody = styled.div`
    overflow-y: scroll;
    height: 668px;

    ::-webkit-scrollbar-thumb {
        background-color: #AAA;
        border-radius: 10px;
    }
    ::-webkit-scrollbar {
        width: 6px;
        background-color: #F5F5F5;
    }
`;

const TableRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    border-bottom: 1px solid rgba(128, 128, 128, 0.5);
    
`;

const TableCell = styled.div`
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;

const ToolTip = styled.span`
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    position: absolute;
    z-index: 1;
`;

const EventsTable = ({eventsData, columnsTitles}) => {
    const tollTipRef = useRef();
    const [tollTipText, setTollTipText] = useState('');

    const onHoverCell = (text) => (event) => {
        setTollTipText(text);
        tollTipRef.current.style.top = (event.clientY + 10) + 'px';
        tollTipRef.current.style.left = (event.clientX + 10) + 'px';
    }

    return (
        <Table>
            {tollTipText && <ToolTip ref={tollTipRef}>{tollTipText}</ToolTip>}
            <TableHeader>
                <TableRow>
                    {columnsTitles.map((title, index) => (
                        <TableCell key={`${index} ${title}`}>
                            <ColumnTitle>{title}</ColumnTitle>
                        </TableCell>
                    ))}
                  </TableRow>
            </TableHeader>
            <TableBody onMouseOut={() => setTollTipText('')}>
                  {eventsData && eventsData.map((event, index) => (
                          <TableRow key={`${index} ${event.ip}`}>
                              <TableCell onMouseEnter={onHoverCell(event.ip)}>{event.ip}</TableCell>
                              <TableCell onMouseEnter={onHoverCell(event.timestamp)}>{event.timestamp}</TableCell>
                              <TableCell onMouseEnter={onHoverCell(event.domain)}>{event.domain}</TableCell>
                              <TableCell onMouseEnter={onHoverCell(event.blacklisted)}>{event.blacklisted ? "Yes" : "No"}</TableCell>
                              <TableCell onMouseEnter={onHoverCell(event.event_type)}>{event.event_type}</TableCell>
                          </TableRow>                
                      ))}
            </TableBody>
      </Table>
    )
}

export default EventsTable;