
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';

// @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
export default function EmptyPageMessage(props: any){ return (<h1 className="py-10 px-20 text-3xl">{props.title}</h1>);}