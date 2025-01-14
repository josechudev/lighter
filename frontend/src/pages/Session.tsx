import React from 'react';
import {useParams} from 'react-router';
import {useSession, useSessionDelete, useSessionLog} from '../hooks/session';
import AppInfo from '../components/AppInfo';
import {Box, Spinner} from '@chakra-ui/react';
import AppLogs from '../components/AppLogs';
import AppTitle from '../components/AppTitle';
import {useNavigate} from 'react-router-dom';
import {RoutePath} from '../configuration/consts';

const Session: React.FC = () => {
  const {id} = useParams();
  const {data: logs} = useSessionLog(id!);
  const {data: session} = useSession(id!);

  const {mutateAsync: doDelete, isLoading: isDeleting} = useSessionDelete();
  const navigate = useNavigate();

  const onDelete = () => {
    doDelete(id!).then(() => navigate(RoutePath.SESSIONS));
  };

  if (isDeleting) {
    return <Spinner />;
  }

  if (!session) {
    return null;
  }

  return (
    <div>
      <AppTitle app={session} onDelete={onDelete} />
      <Box textStyle="caption" mt="5">
        Logs:
      </Box>
      <Box mt="1">
        <AppLogs logs={logs} />
      </Box>

      <AppInfo app={session} />
    </div>
  );
};

export default Session;
