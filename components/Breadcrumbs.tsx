import React from 'react';
import {Row} from './custom';
import {ThemedText, ThemedTextProps} from './ThemedText';
import useNavigation from '../hooks/useNavigation';
import {Href} from '../hooks/useItemHref';
import Logger from '../utils/logger';
// import {StackActions} from '@react-navigation/native';

const logger = new Logger('Breadcrumbs');

interface BreadcrumbsProps extends ThemedTextProps {
  href: Href;
}

export default function Breadcrumbs(props: BreadcrumbsProps) {
  return (
    <Row flexWrap="wrap">
      <BreadcrumbLink {...props} originalHref={props.href} />
    </Row>
  );
}

interface BreadcrumbLinkProps extends BreadcrumbsProps {
  originalHref: Href;
}

function BreadcrumbLink({href, originalHref, ...props}: BreadcrumbLinkProps) {
  const navigation = useNavigation();

  return (
    <>
      <ThemedText
        {...props}
        onPress={() => {
          // TODO: fix navigation
          const formattedHref = formatHref(originalHref, href.screen);
          logger.log(`Navigate to ${href.name}`, formattedHref);
          navigation.navigate('RoomsTab', formattedHref);
          // navigation.dispatch(StackActions.replace('RoomsTab', formattedHref));
        }}>
        {` / ${href.name}`}
      </ThemedText>
      {href.params && (
        <BreadcrumbLink
          href={href.params}
          originalHref={originalHref}
          {...props}
        />
      )}
    </>
  );
}

function formatHref(href?: Href, screen?: string): Href {
  if (href?.screen === screen) {
    return {...href, params: undefined};
  }

  return {...href, params: formatHref(href?.params, screen)};
}
