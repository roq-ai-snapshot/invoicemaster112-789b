import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Link } from '@chakra-ui/react';
import { UserSelect } from 'components/user-select';
import { getApiUsageById } from 'apiSdk/api-usages';
import { Error } from 'components/error';
import { ApiUsageInterface } from 'interfaces/api-usage';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';

function ApiUsageViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ApiUsageInterface>(
    () => (id ? `/api-usages/${id}` : null),
    () =>
      getApiUsageById(id, {
        relations: ['organisation'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Api Usage Detail View
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="lg" fontWeight="bold" as="span">
              Endpoint:
            </Text>
            <Text fontSize="md" as="span" ml={3}>
              {data?.endpoint}
            </Text>
            <br />
            <Text fontSize="lg" fontWeight="bold" as="span">
              Usage Count:
            </Text>
            <Text fontSize="md" as="span" ml={3}>
              {data?.usage_count}
            </Text>
            <br />
            {hasAccess('organisation', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <>
                <Text fontSize="lg" fontWeight="bold" as="span">
                  Organisation:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  <Link as={NextLink} href={`/organisations/view/${data?.organisation?.id}`}>
                    {data?.organisation?.name}
                  </Link>
                </Text>
              </>
            )}
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'api_usage',
  operation: AccessOperationEnum.READ,
})(ApiUsageViewPage);
