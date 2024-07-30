import styled from 'styled-components'

export const ProductsList = styled.div`
  flex: 1;
  overflow: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: #232f3e;
      padding: 1rem;
      text-align: center;
      color: #e1e1e6;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: #c4c4cc;
      text-align: center;
      border-top: 4px solid #e1e1e6;
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 15%;
        padding-left: 1.5rem;
      }

      &:last-child {
        width: 20%;
        padding-right: 1.5rem;
      }
    }
  }
`
