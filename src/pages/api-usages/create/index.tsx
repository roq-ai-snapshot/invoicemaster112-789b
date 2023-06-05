import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createApiUsage } from 'apiSdk/api-usages';
import { Error } from 'components/error';
import { apiUsageValidationSchema } from 'validationSchema/api-usages';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OrganisationInterface } from 'interfaces/organisation';
import { getOrganisations } from 'apiSdk/organisations';
import { ApiUsageInterface } from 'interfaces/api-usage';

function ApiUsageCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ApiUsageInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createApiUsage(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ApiUsageInterface>({
    initialValues: {
      endpoint: '',
      usage_count: 0,
      organisation_id: (router.query.organisation_id as string) ?? null,
    },
    validationSchema: apiUsageValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Api Usage
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="endpoint" mb="4" isInvalid={!!formik.errors?.endpoint}>
            <FormLabel>Endpoint</FormLabel>
            <Input type="text" name="endpoint" value={formik.values?.endpoint} onChange={formik.handleChange} />
            {formik.errors.endpoint && <FormErrorMessage>{formik.errors?.endpoint}</FormErrorMessage>}
          </FormControl>
          <FormControl id="usage_count" mb="4" isInvalid={!!formik.errors?.usage_count}>
            <FormLabel>Usage Count</FormLabel>
            <NumberInput
              name="usage_count"
              value={formik.values?.usage_count}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('usage_count', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.usage_count && <FormErrorMessage>{formik.errors?.usage_count}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<OrganisationInterface>
            formik={formik}
            name={'organisation_id'}
            label={'Select Organisation'}
            placeholder={'Select Organisation'}
            fetcher={getOrganisations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'api_usage',
  operation: AccessOperationEnum.CREATE,
})(ApiUsageCreatePage);
