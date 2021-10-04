import styled from 'styled-components';

export interface materialIconProps {
    iconName: string;
    className?: string;
    isButton?: boolean;
}

const Icon = styled.span`
    font-size: inherit !important;
`;

const MaterialIcon = (props: materialIconProps) => {
    const { iconName, className, isButton } = props;
    return (
        <Icon as={isButton ? 'button' : undefined} {...props} className={`${className} material-icons`}>
            {iconName}
        </Icon>
    );
};

export default MaterialIcon;
