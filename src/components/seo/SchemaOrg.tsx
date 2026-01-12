
import { Helmet } from 'react-helmet-async';

interface SchemaOrgProps {
    schema: Record<string, any>;
}

export const SchemaOrg = ({ schema }: SchemaOrgProps) => {
    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};
