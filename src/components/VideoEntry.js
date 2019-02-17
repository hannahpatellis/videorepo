import React from 'react';
import { Button, Icon, Item, Label } from 'semantic-ui-react'
const moment = require('moment');

const VideoEntry = (e) => {

  let curriculum = '';
  let host = '';

  switch (e.e.curriculum) {
    case 'FSF':
      curriculum = 'Full-Stack Flex';
      break;
    case 'FSF-FT':
      curriculum = 'Full-Stack Flex Full-Time';
      break;
    case 'ENT':
      curriculum = 'Full-Stack Flex Other';
      break;
    default:
      curriculum = 'Other';
  }

  switch (e.e.host) {
    case 'panopto':
      host = 'Panopto';
      break;
    case 'youtube':
      host = 'YouTube';
      break;
    default:
      host = '';
      break;
  }

  return (
    <Item>
      <Item.Content>
        <Item.Header as='a' href={e.e.url}>{e.e.name}</Item.Header>
        <Item.Meta>
          {e.e.unit === 0 ? (
            <span><Icon color='red' name='map marker alternate' /> <span className="extra-note">Supplemental Video</span></span>
          ) : (
              <span><Icon color='red' name='map marker alternate' /> <span className="extra-note">Unit {e.e.unit}, Lesson {e.e.lesson}</span></span>
          )}
          {e.e.class === 'GEN' ? (
            <span className='nopad'></span>
          ) : (
            <span><Icon color='red' name='graduation cap' /> <span className="extra-note">{e.e.class}</span></span>
          )}
          {curriculum === 'Other' ? (
            <span className='nopad'></span>
          ) : (
            <span><Icon color='red' name='book' /> <span className="extra-note">{curriculum}</span></span>
          )}
          <Icon color='red' name='calendar alternate' /> <span className="extra-note">{moment(e.e.date, 'YY-MM-DD').format('MMMM Do, YYYY')}</span>
        </Item.Meta>
        <Item.Extra>
          {e.e.subcategory.map(subcategory => (
            <Label>{subcategory}</Label>
          ))}
          <a href={e.e.url}>
            <Button inverted color='blue' floated='right' icon labelPosition='right'>Watch {host === '' ? '' : `on ${host}`} <Icon name='right chevron' /></Button>
          </a>
        </Item.Extra>
      </Item.Content>
    </Item>
  )
};

export default VideoEntry;