import { FileInfo, Asset, CatalogItem, Policy } from "@/data/interface/file";

export async function uploadFile(form: FormData) {
  try {
    const response = await fetch(`/api/uploadFile`, {
        method: 'POST',
        body: form,
    });
    
    if (!response.ok) {
        throw new Error("HTTP Error! Status: ${response.status}");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error uploading file: ", err);
    throw new Error("Failed to upload file");
  }
}

export async function isConnectorRunning(connectorName: string): Promise<boolean> {
    try {
        const response = await fetch(`/api/check_status?connector=${connectorName}`);

        if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data.isRunning;
    } catch (error) {
        console.error('Error occurred while checking connector status:', error);
        throw error;
    }
}

export async function isDatabaseRunning(connectorName: string): Promise<boolean> {
    try {
        const response = await fetch(`/api/check_db_status?connector=${connectorName}`);

        if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data.isRunning;
    } catch (error) {
        console.error('Error occurred while checking database status:', error);
        throw error;
    }
}

  
export async function fetchCatalogItems(counterPartyName: string): Promise<CatalogItem[]> {
  try {
    const response = await fetch(`/api/fetchCatalog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ counterPartyName: counterPartyName }),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data.map((item: any) => ({
      date: item.date,
      name: item.name,
      author: item.author,
      title: item.title,
      id: item.id,
      contenttype: item.contenttype,
      size: item.size,
      contractIds: Array.isArray(item.contractIds) ? item.contractIds : [item.contractIds]
    }));
  } catch (error) {
    console.error('Error occurred while fetching catalog data:', error);
    throw error;
  }
}


export async function getPolicies(): Promise<Policy[]> {
  try {
    const response = await fetch('/api/getPolicies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('Error occurred while fetching policy data:', error);
    throw error;
  }
}


export async function getAssets(): Promise<Asset[]> {
  try {
    const response = await fetch('/api/getAssets', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    console.error('Error fetching assets: ', err);
    throw new Error('Failed to fetch assets');
  }
}

export async function createAsset(file: FileInfo): Promise<boolean> {
  try {
    const response = await fetch('/api/createAsset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: file.name,
        description: file.title,
        baseUrl: file.link,
        assetId: file.id,
        contenttype: file.contenttype,
        date: file.uploadDate,
        size: file.size
      })
    });
    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }

    return true;
  } catch (err) {
    throw new Error("Error creating asset: ", err);
  }
}

export async function createContractDefinition(contractId: string, policyId: string, assetId: string): Promise<boolean> {
  try {
    const response = await fetch('/api/createContractDefinition', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contractId: contractId,
        policyId: policyId,
        assetId: assetId
      })
    });
    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }

    return true;
  } catch (err) {
    throw new Error("Error creating contract definition: ", err);
  }
}
export async function getContractAgreementId(negotiationId: string): Promise<string> {
  try {
    const agreementResponse = await fetch(`/api/getContractAgreementId?negotiationId=${negotiationId}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  });
    if (!agreementResponse.ok) {
      throw new Error(`API call failed with status ${agreementResponse.status}`);
    }

    const data = await agreementResponse.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data['agreementId' as any];
  } catch (err) {
    console.error('Error fetching assets: ', err);
    throw new Error('Failed to fetch assets');
  }
}

  export async function startTransfer(contractId: string, assetId: string, counterPartyName: string): Promise<{ url: string, authorization: string }> {
    try {
      const response = await fetch('/api/startTransfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contractId: contractId,
          counterPartyName: counterPartyName,
          assetId: assetId
        })
      });
      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Transfer: ", data);
      if (data.error) {
        throw new Error(data.error);
      }
      return { url: data.url, authorization: data.authorization };
    } catch (err) {
      throw new Error("Error starting transfer: ", err);
    }
  }

export async function negotiateContract(item: CatalogItem) {
  try {
    const negotiateResponse = await fetch('/api/negotiateContract', {
      method: 'POST',   
      cache: 'no-cache',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          contractOfferId: item.contractIds[0], 
          assetId: item.id,
          counterPartyName: item.author
      })
    });

    if (!negotiateResponse.ok) {
        throw new Error(`Failed to negotiate contract: ${negotiateResponse.statusText}`);
    }

    const negotiationResult = await negotiateResponse.json();
    const negotiationId = negotiationResult['@id'];
    return negotiationId;

  } catch (err) {
    console.error("Error negotiating contract", err);
    throw new Error("Failed to negotiate contract: ", err);
  }
}

interface ContractAgreement {
  providerId: string;
  [key: string]: any;
}

export async function getNegotiatedContracts(counterpartyname: string) {
   try {
    const response = await fetch("/api/getNegotiatedContracts", {
      method: "GET"
  });
    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    const data: ContractAgreement[] = await response.json();

    return data.filter(item => item.providerId === counterpartyname);

  } catch (err) {
    console.error('Error getting contract agreement info: ', err);
    throw new Error('Failed to get contract agreement info');
  }
}

export async function getContractAgreementInfo(agreementId: string) {
  try {
    const response = await fetch("/api/getContractAgreementInfo", {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        agreementId: agreementId
      })
  });
    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    console.error('Error getting contract agreement info: ', err);
    throw new Error('Failed to get contract agreement info');
  }
}

export async function uploadContractAgreementInfo(item: CatalogItem, agreementId: string) {
    try {
    const response = await fetch("/api/getContractAgreementInfo", {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        agreementId: agreementId,
        fileName: item.name,
        fileSize: item.size,
        title: item.title,
        date: item.date,
        author: item.author,
        contenttype: item.contenttype
      })
  });
    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    return true;
  } catch (err) {
    console.error('Error uploading contract agreement info: ', err);
    throw new Error('Failed to upload contract agreement info');
  }
}


